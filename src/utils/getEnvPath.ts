import { join } from 'node:path';

const getEnvPath = (): string => {
    /**
     * Actual path of the module.
     * @const
     * @type {string}
     */
    const __dirname: string = process.cwd();

    /**
     * Path of the environment variables file.
     * @const
     * @type {string}
     */
    const envPath: string = join(__dirname, 'src', '.env');
    return envPath;
}

export default getEnvPath;