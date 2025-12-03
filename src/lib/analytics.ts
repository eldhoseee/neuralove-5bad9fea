// Simple analytics wrapper for tracking events
// Can be easily replaced with GA4, Plausible, or other services

interface AnalyticsEvent {
    name: string;
    properties?: Record<string, any>;
}

class Analytics {
    private isEnabled: boolean;

    constructor() {
        // Only enable in production
        this.isEnabled = import.meta.env.PROD;
    }

    /**
     * Track a page view
     */
    pageView(path: string) {
        if (!this.isEnabled) {
            console.log('[Analytics] Page view:', path);
            return;
        }

        // TODO: Replace with actual analytics service
        // Example for Plausible:
        // window.plausible?.('pageview');

        // Example for GA4:
        // window.gtag?.('event', 'page_view', { page_path: path });
    }

    /**
     * Track a custom event
     */
    track(eventName: string, properties?: Record<string, any>) {
        if (!this.isEnabled) {
            console.log(`[Analytics] Event: ${eventName}`, properties);
            return;
        }

        // TODO: Replace with actual analytics service
        // Example for Plausible:
        // window.plausible?.(eventName, { props: properties });

        // Example for GA4:
        // window.gtag?.('event', eventName, properties);
    }

    /**
     * Track user actions
     */
    trackQuizStarted(source: string) {
        this.track('quiz_started', { source });
    }

    trackQuizCompleted(cognitiveType: string, duration?: number) {
        this.track('quiz_completed', { cognitive_type: cognitiveType, duration_seconds: duration });
    }

    trackProfileCreated(age: number, gender: string) {
        this.track('profile_created', { age, gender });
    }

    trackButtonClick(buttonName: string, location: string) {
        this.track('button_click', { button_name: buttonName, location });
    }

    trackFeedbackSubmitted(type: string) {
        this.track('feedback_submitted', { feedback_type: type });
    }

    trackRoastShared(platform: string) {
        this.track('roast_shared', { platform });
    }

    trackError(errorMessage: string, componentName?: string) {
        this.track('error_occurred', { error_message: errorMessage, component: componentName });
    }
}

// Export singleton instance
export const analytics = new Analytics();

// Usage examples:
// analytics.trackQuizStarted('hero_cta');
// analytics.trackProfileCreated(25, 'male');
// analytics.trackButtonClick('Find Your MindMatch', 'hero');
