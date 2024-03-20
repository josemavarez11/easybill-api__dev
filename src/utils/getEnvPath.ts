import { dirname, join } from 'node:path';

const getEnvPath = (): string => {
    /**
     * Actual path of the module.
     * @const
     * @type {string}
     */
    const __dirname: string = dirname(process.argv[1]);

    /**
     * Path of the environment variables file.
     * @const
     * @type {string}
     */
    const envPath: string = join(dirname(__dirname), '.env');
    return envPath;
}

export default getEnvPath;