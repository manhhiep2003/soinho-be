import { RequestContext } from 'nestjs-request-context';

export class AppRequestContext extends RequestContext {
  requestId: string;
  user: any;
}

export class RequestContextService {
  static getContext(): AppRequestContext {
    const ctx = RequestContext.currentContext.req as AppRequestContext;
    return ctx;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  static getRequestId(): string {
    return this.getContext().requestId;
  }
}
