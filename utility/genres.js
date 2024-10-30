const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/movies.json');

/**
 * Writes genres data to the JSON file
 * @param {Array} data - Array of genre objects to write
 * @throws {Error} If writing to file fails
 */
exports.writeGenresTotheFile = async (data) => {
    if (!Array.isArray(data)) {
        throw new Error('Input must be an array');
    }

    try {
        const content = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, content);
    } catch (error) {
        throw new Error(`Failed to write genres: ${error.message}`);
    }
};

/**
 * Reads genres data from the JSON file
 * @returns {Promise<Array>} Array of genre objects
 * @throws {Error} If reading from file fails
 */
exports.readGenresFromFile = async () => {
    try {
        try {
            await fs.access(filePath);
        } catch {
            await exports.writeGenresTotheFile([]);
            return [];
        }

        const data = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(data);
        
        if (!Array.isArray(parsed)) {
            throw new Error('File content is not an array');
        }

        return parsed;
    } catch (error) {
        throw new Error(`Failed to read genres: ${error.message}`);
    }
};

const ensureDataDirectory = async () => {
    const dataDir = path.dirname(filePath);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
};
