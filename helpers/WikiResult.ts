import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
import { HttpStatusCode, IHttp, ILogger, IRead } from '@rocket.chat/apps-engine/definition/accessors';

export class WikiResult {
    public mssg: string;
   
  constructor(extract?: any) {
        if (extract) {
            this.mssg = extract as string;
        }

}}