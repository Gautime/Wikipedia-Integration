import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { WikiCommand } from './commands/WikiCommand';
import { WikiGetter } from './helpers/WikiGetter';


export class WikipediaApp extends App {

    private wikiGetter: WikiGetter;

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);

		this.wikiGetter = new WikiGetter();
    }

    public getWikiGetter(): WikiGetter {
        return this.wikiGetter;
    }
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(new WikiCommand());
    }

}
