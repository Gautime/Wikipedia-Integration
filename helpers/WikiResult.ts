import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
import { HttpStatusCode, IHttp, ILogger, IRead } from '@rocket.chat/apps-engine/definition/accessors';

export class WikiResult {
    public extract: string;
  constructor(data?: any) {
        if (data) {
            this.extract = data.extract as string;
        }

}}