import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';

export class WikiResult {
    public content: string;
   
  constructor(data?: any) {
        if (data) {
            this.content = data.content as string;

        }
}