/**
 * Structured Logger for Site Feasibility Feature
 *
 * Safe client/server logging helper for site feasibility calculations,
 * document ingestion events, and error tracking.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  message: string;
  context?: Record<string, unknown>;
  error?: Error | unknown;
}

class SiteFeasibilityLogger {
  private formatPrefix(level: LogLevel): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [SiteFeasibility:${level.toUpperCase()}]`;
  }

  info(message: string, context?: Record<string, unknown>) {
    console.log(`${this.formatPrefix('info')} ${message}`, context || '');
  }

  warn(message: string, context?: Record<string, unknown>) {
    console.warn(`${this.formatPrefix('warn')} ${message}`, context || '');
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    console.error(`${this.formatPrefix('error')} ${message}`, {
      context,
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
    });
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`${this.formatPrefix('debug')} ${message}`, context || '');
    }
  }
}

export const logger = new SiteFeasibilityLogger();
