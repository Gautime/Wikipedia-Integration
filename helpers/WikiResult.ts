import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
import { HttpStatusCode, IHttp, ILogger, IRead } from '@rocket.chat/apps-engine/definition/accessors';

export class WikiResult {
    public extract: string;
   
  constructor(query?: any) {
        if (query) {
            this.extract = query.pages.pageid.extract as string;

        }

}}