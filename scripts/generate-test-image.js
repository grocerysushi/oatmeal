const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTestImage() {
  try {
    console.log('🎨 Generating test image for Daily AI Artwork site...');

    const prompt = "A beautiful, ethereal digital art gallery with floating artworks in a minimalist space, soft ambient lighting, modern architecture, clean white walls, AI-generated paintings displayed elegantly, futuristic and serene atmosphere, high quality, professional photography style";

    console.log(`📝 Prompt: ${prompt}`);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
      style: 'vivid',
    });

    const imageUrl = response.data[0].url;

    if (imageUrl) {
      console.log('✅ Image generated successfully!');
      console.log(`🔗 Image URL: ${imageUrl}`);
      console.log('💡 You can use this URL in your README or save the image locally');

      // Also log the revised prompt that DALL-E used
      if (response.data[0].revised_prompt) {
        console.log(`🎯 Revised prompt: ${response.data[0].revised_prompt}`);
      }

      return {
        url: imageUrl,
        prompt: prompt,
        revisedPrompt: response.data[0].revised_prompt || prompt
      };
    } else {
      throw new Error('No image URL returned');
    }
  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return null;
  }
}

// Run the function
generateTestImage().then(result => {
  if (result) {
    console.log('\n🎉 Test image generation completed successfully!');
    console.log('You can now use this image for your site branding or README.');
  } else {
    console.log('\n❌ Failed to generate test image. Please check your OpenAI API key and try again.');
  }
  process.exit(0);
});