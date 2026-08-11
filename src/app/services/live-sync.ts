import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import { Subject } from 'rxjs';

export interface EnrollmentStatusEvent {
  id: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Injectable({
  providedIn: 'root',
})
export class LiveSync {
  private platformId = inject(PLATFORM_ID);

  private connection: HubConnection | null = null;

  private eventsSubject = new Subject<EnrollmentStatusEvent>();

  // Expose SignalR events to the store/components
  events$ = this.eventsSubject.asObservable();

  // Connection state for UI
  connectionState = signal<'connected' | 'reconnecting' | 'disconnected'>('disconnected');

  connect(): void {
    // Prevent duplicate connections
    if (this.connection) {
      return;
    }

    // SignalR/WebSocket should only run in the browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl('/hubs/tms')
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .build();

    // Receive enrollment status updates from the backend
    this.connection.on(
      'ReceiveEnrollmentStatusUpdated',
      (enrollmentId: string, status: 'Pending' | 'Approved' | 'Rejected') => {
        this.eventsSubject.next({
          id: enrollmentId,
          status,
        });
      },
    );

    // Connection lifecycle events
    this.connection.onreconnecting(() => {
      this.connectionState.set('reconnecting');
    });

    this.connection.onreconnected(() => {
      this.connectionState.set('connected');
    });

    this.connection.onclose(() => {
      this.connectionState.set('disconnected');
      this.connection = null;
    });

    // Start SignalR connection
    this.connection
      .start()
      .then(() => {
        this.connectionState.set('connected');
        console.log('SignalR connected');
      })
      .catch((err) => {
        this.connectionState.set('disconnected');
        console.error('SignalR connection error:', err);

        // Allow connect() to be called again after failure
        this.connection = null;
      });
  }

  disconnect(): void {
    if (!this.connection) {
      return;
    }

    this.connection
      .stop()
      .then(() => {
        this.connection = null;
        this.connectionState.set('disconnected');
      })
      .catch((err) => {
        console.error('SignalR disconnect error:', err);
      });
  }
}
