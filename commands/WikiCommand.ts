import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, ISlashCommandPreview, ISlashCommandPreviewItem, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { WikipediaApp } from '../Wikipedia';
import { WikiResult } from '../helpers/WikiResult';


export class WikiCommand implements ISlashCommand {
        public command = 'wiki';
        public i18nParamsExample = 'Wikipedia_Search_Term';
        public i18nDescription = 'Wikipedia_Command_Description';
        public providesPreview = false;

	    constructor(private readonly app: WikipediaApp) { }

	  public executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        
        throw new Error('Method not implemented.');
     }  

       public async executeitem(item: ISlashCommandPreviewItem, context: SlashCommandContext, read: IRead,
        modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const builder = modify.getCreator().startMessage().setSender(context.getSender()).setRoom(context.getRoom());
            try{
		    const term = context.getArguments().join(' ').trim();

		    builder.addAttachment({
                
                author: {
                    icon: 'https://github.com/Gautime/Wikipedia-Integration/blob/master/wiki.png',
                    name: `/wiki ${term.trim()}`,
                    link: `https://en.wikipedia.org/wiki/${term.trim()}`,
                },
                
            });
            await modify.getCreator().finish(builder);
            }catch (e) {
            this.app.getLogger().error('Failed getting a gif', e);
            builder.setText('An error occurred when trying to send the gif :disappointed_relieved:');

            modify.getNotifier().notifyUser(context.getSender(), builder.getMessage());
         }
        }
    

}

