import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

 // Define POST request handler function
export const POST = async (req, res) => {
  // Destructure request body
  const { userId, prompt, tag } = await req.json();
   try {
    // Connect to database
    await connectToDB();
     // Create new prompt object
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag, 
    });
     // Save prompt to database
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (err) {
   return new Response("Failed to create a new prompt", {status: 500})
  }
};