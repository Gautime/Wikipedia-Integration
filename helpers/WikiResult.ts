import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';

export class WikiResult {
    public extract: string;
   
  constructor(data?: any) {
        if (data) {
            this.extract = data.content as string;

        }
}}