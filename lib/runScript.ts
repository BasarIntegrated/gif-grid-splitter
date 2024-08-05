import { exec } from "child_process";
import { promisify } from "util";

// Convert exec to return a promise
export const execPromise = promisify(exec);

// Function to run a shell script and wait for the result
const runScript = async (scriptPathArgs: string): Promise<void> => {
  try {
    console.log(`Running script: ${scriptPathArgs}`);

    // Execute the script and wait for it to complete
    const { stdout, stderr } = await execPromise(`${scriptPathArgs}`);

    // Log the standard output and errors
    if (stdout) {
      console.log(`stdout: ${stdout}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }

    console.log("Script execution completed.");
  } catch (error: any) {
    console.error(`Error executing script: ${error.message}`);
  }
};

export default runScript;
