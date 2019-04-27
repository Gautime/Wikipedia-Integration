import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, ISlashCommandPreview, ISlashCommandPreviewItem, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { WikipediaApp } from '../Wikipedia';
import { WikiResult } from '../helpers/WikiResult';


export class WikiCommand implements ISlashCommand {
        public command = 'wiki';
        public i18nParamsExample = 'wiki_search-term';
        public i18nDescription = 'wiki-description';
        public providesPreview = false;

	    constructor(private readonly app: WikipediaApp) { }

	  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        
        const parame = context.getArguments().join(' ');

        if(!parame)
        throw new Error('Method not implemented.');
     }  

       public async executeitem(item: ISlashCommandPreviewItem, context: SlashCommandContext, read: IRead,
        modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const builder = modify.getCreator().startMessage().setSender(context.getSender()).setRoom(context.getRoom());
            try{
             const term = context.getArguments().join(' ').trim();

            const wik = await this.app.getWikiGetter().getOne(this.app.getLogger(), http, term, read);


		    builder.addAttachment({
                
                text: wik.mssg
                
            });
            await modify.getCreator().finish(builder);
            }catch (e) {
            this.app.getLogger().error('Failed getting text', e);
            builder.setText('An error occurred when trying to send text :');

            modify.getNotifier().notifyUser(context.getSender(), builder.getMessage());
         }
        }
    

}

