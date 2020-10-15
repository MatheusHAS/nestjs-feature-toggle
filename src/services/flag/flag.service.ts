import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const { initialize } = require('unleash-client');

@Injectable()
export class FlagService {
    unleashInstance:any = null;
    
    constructor(public configService: ConfigService) {
        const unleashConfig = configService.get("UNLEASH");
        const { endpoint, appName } = unleashConfig;
        if (endpoint && appName && !this.unleashInstance) {
            this.unleashInstance = initialize({
                url: endpoint,
                appName,
            });
            this.unleashInstance.on('error', console.error);
            this.unleashInstance.on('warn', console.warn);
            this.unleashInstance.on('ready', console.log);
        }
    }
    
    async isEnabled(flagName: string, currentUser: any = null): Promise<Boolean> {
        if (!this.unleashInstance) {
            return false;
        }

        const { type, ip, sessionId } = currentUser;
        
        // https://github.com/Unleash/unleash/blob/master/docs/unleash-context.md
        const userContext = {
            userId: type,
            remoteAddress: ip,
            sessionId
        };
        
        const flagResult = await this.unleashInstance.isEnabled(flagName, userContext);
        console.log(`[${flagName}]`, flagResult)
        return flagResult;
    }
}
