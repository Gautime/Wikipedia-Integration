import { HttpStatusCode, IHttp, ILogger, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { WikiResult } from '../helpers/WikiResult';


export class WikiGetter {
    private readonly url = 'http://en.wikipedia.org/w/api.php?';

    public async search(logger: ILogger, http: IHttp, phase: string, read: IRead): Promise<Array<WikiResult>> {
        let search = phase.trim();
        if (!search) {
            search = 'random';
        }
    
    const response = await http.get(`${this.url}action=query&format=json&prop=extracts&rvprop=content&rvsection=0&titles=${search}`);


if (response.statusCode !== HttpStatusCode.OK || !response.data || !response.data.data) {
            logger.debug('Did not get a valid response', response);
            throw new Error('Unable to retrieve data.');
        } else if (!Array.isArray(response.data.data)) {
            logger.debug('The response data is not an Array:', response.data.data);
            throw new Error('Data is in a format we don\'t understand.');
        }
        return response.data.data.map((r) => new WikiResult(r));


}}