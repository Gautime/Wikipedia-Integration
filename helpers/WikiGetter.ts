import { HttpStatusCode, IHttp, ILogger, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { WikiResult } from '../helpers/WikiResult';


export class WikiGetter {
        private readonly url = 'http://en.wikipedia.org/w/api.php?';


        public async getOne(logger: ILogger, http: IHttp, phrase: any, read: IRead): Promise<WikiResult> {

            let search = phrase.trim();
            if (!search) {
            search = 'random';
            }
            const response = await http.get(`${this.url}action=query&format=json&prop=extracts&rvprop=content&rvsection=0&titles=${search}`);

            if (response.statusCode !== HttpStatusCode.OK || !response.data || !response.data.query) {
                logger.debug('Did not get a valid response', response);
                throw new Error('Unable to retrieve the gif.');
            } else if (typeof response.data.query !== 'object') {
                logger.debug('The response data is not an Object:', response.data.query);
                throw new Error('Data is in a format we don\'t understand.');
            }
    
            // logger.debug('The returned data:', response.data.data);
            return new WikiResult(response.data.query);
        }

}