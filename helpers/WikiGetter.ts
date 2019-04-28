import { HttpStatusCode, IHttp, ILogger, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { WikiResult } from '../helpers/WikiResult';


export class WikiGetter {
        private readonly url = 'https://en.wikipedia.org/api/rest_v1/page/summary';


        public async getOne(logger: ILogger, http: IHttp, phrase: any, read: IRead): Promise<WikiResult> {

            let search = phrase.trim();
            if (!search) {
            search = 'random';
            }
            const response = await http.get(`${this.url}/${search}`);
            try{
            if (response.statusCode !== HttpStatusCode.OK || !response.data) {
               logger.debug('Did not get a valid response', response);
                throw new Error('Unable to retrieve the text.');
            } else if (typeof response.data.extract !== 'object') {
               logger.debug('The response data is not an Object:', response.data);
                throw new Error('Data is in a format we don\'t understand.');
            }
            return new WikiResult(response.data);

            }catch(e){
                return new WikiResult(response.data);
            }
            //console.log('The returned data:', response.data.query);
        }
    }
        

