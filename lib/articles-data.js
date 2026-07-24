export const articles = [
    {
        slug: 'mlx-vs-gguf',
        title: 'Understanding MLX vs. GGUF for Local AI on Apple Devices',
        date: '2026-07-15',
        category: 'AI · On-Device',
        excerpt: 'When getting started with local AI on a Mac or iOS device, two common inference ecosystems you will encounter are MLX and llama.cpp. And when running AI locally on your Apple device, one of the first choices you will make is whether you choose a model prepared for MLX or a GGUF model designed for a llama.cpp-based runtime.',
        mediumUrl: 'https://medium.com/@jordans2299/understanding-mlx-vs-gguf-for-local-ai-on-apple-devices-a43727238eb3',
        content: [
            { type: 'p', text: 'When getting started with local AI on a Mac or iOS device, two common inference ecosystems you will encounter are MLX and llama.cpp. And when running AI locally on your Apple device, one of the first choices you will make is whether you choose a model prepared for MLX or a GGUF model designed for a llama.cpp-based runtime. But what does this all mean? What significance does this have for the model you use and its performance?' },
            { type: 'p', text: "The naming conventions in the local AI space are a little confusing, to say the least, so let's break down these terms a bit." },
            { type: 'p', text: "Llama is the name of Meta's model family. llama.cpp, despite its similar name, is an independent piece of open-source software that started as a lightweight C/C++ inference engine for running Meta's LLaMA-family models locally. Now, llama.cpp supports many model architectures stored in the GGUF format, including Qwen, Gemma, Mistral, Phi, and others." },
            { type: 'p', text: 'GGUF is the model file format that is usually associated with llama.cpp. GGUF models are packaged into a single file with a .gguf extension. For a typical text model, the one file contains all of the model weights and metadata needed for running it.' },
            { type: 'p', text: "MLX is a machine-learning framework designed specifically for Apple silicon. MLX does not have a specific model format. Instead, a model prepared for MLX is commonly distributed as a folder containing one or more Safetensors weight files, a configuration file, and tokenizer files. Apple provides several open-source projects built around MLX. Arbiter uses Apple's official mlx-swift-lm package, which is built on top of mlx-swift, Apple's lower-level Swift interface to the MLX framework." },
            { type: 'p', text: 'One of the biggest benefits of the llama.cpp and GGUF architecture is portability. Because llama.cpp runs across many platforms, the same GGUF model can be easily shared across macOS, Windows, Linux, and iOS, given that the application supports the model\'s architecture and quantization type. This makes GGUF useful when you want to move models between devices or use the same model with several different applications.' },
            { type: 'p', text: "MLX is limited to Apple silicon hardware, but that is what ultimately gives it some key advantages. Apple silicon is built around a unified memory architecture. In simple terms, unified memory allows the GPU and CPU to access the same RAM. Many consumer PCs have substantially more system RAM than dedicated GPU memory. Because Apple silicon uses one shared pool, a Mac with 32 GB or 64 GB of unified memory can potentially run models that would not fit entirely within the VRAM of a typical consumer graphics card. However, memory bandwidth and GPU compute performance also matter, so it's not a given that a Mac will necessarily be better for local AI inference. MLX is built to fully take advantage of this pooled memory, which can result in faster performance and more efficient memory use." },
            { type: 'p', text: 'This does not mean that every MLX model will automatically outperform its GGUF equivalent. llama.cpp can also be optimized for Apple hardware and supports Metal acceleration. Actual performance depends on a wide variety of factors, including the parameter count, context length, quantization method, and device specs.' },
            { type: 'p', text: 'It is also important to separate the model format from quantization. Both MLX-prepared models and GGUF models can be distributed at different quantization levels. Original model checkpoints are often released using higher-precision representations like FP16 or BF16. Quantization converts the model\'s weights into more compact representations, commonly described as 8-bit, 6-bit, 4-bit, or lower. The quantization techniques get pretty complicated, and we would need several more articles devoted to explaining that process. In short, the process of quantization reduces memory usage and can improve inference speed, but it can also negatively affect model output quality. Thus, two versions of the same model may behave differently depending on the quantization technique used.' },
            { type: 'p', text: 'Multimodal support is another area to consider. Both the MLX and llama.cpp ecosystems support a growing number of models that can process images along with text. That being said, in my research for Arbiter, particularly when looking at smaller models suitable for iPhones, I found more usable multimodal options in the MLX ecosystem.' },
            { type: 'p', text: 'For most Arbiter users on Apple silicon, I recommend starting with an MLX version when a well-supported conversion of the model is available. MLX is designed specifically for Apple hardware and may offer better performance or efficiency for certain models.' },
            { type: 'p', text: 'GGUF remains an excellent option when you want broader model availability, cross-platform portability, simpler single-file model management, or access to a particular quantization that is not available through MLX.' },
            { type: 'p', text: "Neither option is universally better. The right choice depends on your device, the particular model, the available conversions, and whether you value Apple-specific optimization or broader portability. For Arbiter, I personally recommend MLX models for devices that can support them. It's the more Apple-native way of using local models. But as always, the space moves too fast to form opinions that are too strong. Stay tuned for the latest updates, as the space is constantly evolving." },
        ],
    },
    {
        slug: 'beyond-the-cloud',
        title: "Beyond the Cloud: How Local LLMs Are Shaping AI's Future",
        date: '2025-05-11',
        category: 'AI · On-Device',
        excerpt: "It's only been a few years since ChatGPT took the world by storm. What was once an uncanny novelty that brought sci-fi to real life as an omniscient personal helper is now a regular part of our internet experience. But where does this future take us?",
        mediumUrl: 'https://medium.com/@jordans2299/beyond-the-cloud-how-local-llms-are-shaping-ais-future-0ea55d96b788',
        content: [
            { type: 'p', text: "It's only been a few years since ChatGPT took the world by storm. What was once an uncanny novelty that brought sci-fi to real life as an omniscient personal helper is now a regular part of our internet experience. From search-engine integration to advanced code autocompletes, this is a tool that we will come to rely on — for better and for worse. But where does this future take us? I foresee two big issues with the current landscape of generative-AI distribution. One is that many of these models are running on the cloud, by large, billion-dollar companies. For many, this raises serious privacy concerns, since these models have access to so much valuable data — people's health concerns, job resumes, coding projects, etc. Another concern that doesn't get talked about as much is that these models are burning cash like crazy. If you know how late capitalism works — especially the big-tech blitzscaling strategy — then you know this is a common tactic to gain market share before the eventual scaling back of features behind increasingly expensive paywalls. This will make these companies a lot of money but force many users to use lower-quality models than their peers who can afford the best models and features being offered." },
            { type: 'p', text: 'There is a saving grace here, though: locally run LLMs. Shortly after ChatGPT was released, developers quickly realized that they could create very good, lighter-weight models (think fewer parameters, less space, less compute) by using ChatGPT and other heavyweight models to train their own in a process often called "distillation." Thus began the trend of lighter-weight open-source models that are free for people to download — and some are even commercially viable for developers to build apps from. Leveraging local LLMs has been gaining traction for a while, but there are still few truly polished, commercially viable apps for most casual users. And what happens when larger models get put behind paywalls? I think this creates a great opportunity for the development of better local AI platforms that won\'t be extremely expensive to host in the cloud. Over time, these local models should get even better at running on-device, solving more advanced problems while using less compute. So let\'s take a look at the current landscape of private, local generative AI.' },
            { type: 'h2', text: 'Current State of Local LLM Apps' },
            { type: 'p', text: 'Today, several pioneering apps demonstrate what on-device LLMs can do, though most are still in early stages of UX and model polish. Apps like LLMFarm leverage Metal acceleration to run quantized models (LLaMA, Falcon, MPT) locally on modern iPhones, offering a menu of open-source checkpoints for users to choose from. Private LLM packages a standalone chatbot experience with simple prompt templates, but its model options and context length remain limited. And On-Device AI: LLM & Voice Memo integrates speech-to-text with a small, distilled model for short reply generation entirely offline. These apps prove feasibility but often trade off fluency, context window, or speed to fit within RAM and battery budgets.' },
            { type: 'h2', text: 'Development Ecosystem' },
            { type: 'p', text: "Under the hood, developer toolchains have matured rapidly. llama.cpp popularized 4-bit and 8-bit quantization pipelines plus a lightweight C library that runs on CPU/Metal; Swift wrappers now make integration into Xcode projects straightforward. MLC LLM extends this by compiling PyTorch/ONNX models into ANE- and Metal-optimized kernels, with an iOS SDK that handles memory-mapping and streaming inference. Apple's Core ML remains a go-to for those preferring a first-party solution — coremltools can ingest a quantized model and output an .mlmodel that taps the Neural Engine automatically. Community efforts are also standardizing on-device embedding indexes for local retrieval, enabling apps to search user documents without exposing data externally." },
            { type: 'h2', text: 'Future Outlook' },
            { type: 'p', text: "As both models and hardware evolve, the bar for on-device intelligence will keep rising. Upcoming smaller architectures (e.g., mixture-of-experts or sparse-attention designs) promise to deliver higher accuracy per parameter, while next-gen Apple silicon will boost on-chip RAM and Neural Engine throughput. We'll likely see more adaptive model loading, where an app dynamically swaps in larger sub-models only when needed, and federated fine-tuning that personalizes an LLM on your device without sharing raw data. Over the next 1–2 years, expect local LLMs to handle multi-turn dialogues with longer contexts, integrate seamlessly with on-device APIs (calendar, photos, documents), and even support private voice assistants that never connect to the cloud. For developers, this means a widening scope of privacy-first features, new UX paradigms around streaming inference, and business models that blend paid model-packs with one-time app purchases — all fueling a robust edge-AI ecosystem outside the server farms." },
            { type: 'h2', text: 'Final Thoughts' },
            { type: 'p', text: "I'm still early in my research, but it's clear there's enormous room for growth over the next few years. Developers who build intuitive, user-friendly apps leveraging local LLMs will gain a major advantage as the AI sector expands. This article represents my first deep dive into the topic — stay tuned for more insights as I explore building my own on-device LLM application and document my progress every step of the way." },
        ],
    },
    {
        slug: 'linear-regression-from-scratch',
        title: 'Building Linear Regression Model from Scratch (No Libraries)',
        date: '2023-10-07',
        category: 'Machine Learning',
        excerpt: 'Linear regression establishes a linear relationship between an independent and dependent variable by fitting a line capturing the underlying data trend. This article covers two approaches: least squares (analytical) and gradient descent (iterative).',
        mediumUrl: 'https://medium.com/@jordans2299/building-linear-regression-model-from-scratch-no-libraries-1d75782aa617',
        content: [
            { type: 'h2', text: 'What is Linear Regression?' },
            { type: 'p', text: 'Linear regression establishes a linear relationship between an independent and dependent variable by fitting a line capturing the underlying data trend. This article presents two approaches: least squares (analytical) and gradient descent (iterative).' },
            { type: 'h2', text: 'Least Squares Method' },
            { type: 'p', text: 'The least squares approach minimizes error by calculating the difference between actual and predicted y-values. The error is the difference between the actual y value and the predicted y value.' },
            { type: 'p', text: 'Errors are squared rather than using absolute values for computational efficiency. Squaring keeps the equation differentiable and weights larger errors more heavily, though this can be problematic with outliers.' },
            { type: 'p', text: 'The method finds the sum of squared errors (E), then uses calculus optimization to solve for parameters m and c by setting partial derivatives to zero.' },
            { type: 'h2', text: 'Gradient Descent Algorithm' },
            { type: 'p', text: 'Gradient descent is an iterative optimization algorithm minimizing the cost function. The process involves:' },
            { type: 'ul', items: [
                'Initialization: Start with initial m and c values (zeros or random)',
                'Compute Gradient: Calculate partial derivatives of the cost function',
                'Update Parameters: Adjust values opposite to the gradient direction using learning rate α',
                'Iteration: Repeat until convergence',
            ] },
            { type: 'h2', text: 'Learning Rate Consideration' },
            { type: 'p', text: "The learning rate is critical. If it's too large, the algorithm might overshoot the minimum and diverge. If it's too small, the convergence might be very slow." },
            { type: 'h2', text: 'Python Implementation' },
            { type: 'p', text: 'The article provides a custom LinearRegression class implementing gradient descent, then compares its performance against scikit-learn\'s model using mean squared error metrics.' },
        ],
    },
    {
        slug: 'openai-whisper-nextjs-13',
        title: 'Using OpenAI Whisper API with Next.js 13',
        date: '2023-07-18',
        category: 'Web Development',
        excerpt: "If you've been seeking guidance on how to integrate Whisper into your website, and are also seeking clarity on the App Router system introduced in the latest version of Next.js, then you've arrived at the perfect destination.",
        mediumUrl: 'https://medium.com/@jordans2299/using-openai-whisper-api-with-next-js-13-8a19dcd0fdbf',
        content: [
            { type: 'p', text: "If you've been seeking guidance on how to integrate Whisper into your website, and are also seeking clarity on the App Router system introduced in the latest version of Next.js, then you've arrived at the perfect destination." },
            { type: 'p', text: "In this tutorial, we'll walk through the process of building a speech-to-text application using Next.js 13, the latest version of the popular React framework. We'll leverage the new App Router in Next.js 13, which provides a unified, server-centric routing system that simplifies the routing structure and improves the performance of Next.js applications. Let's get started!" },
            { type: 'h2', text: 'Prerequisites' },
            { type: 'ul', items: [
                'Node.js and npm',
                'Next.js',
                'Your favorite code editor (VS Code, Atom, etc.)',
                'OpenAI API key',
            ] },
            { type: 'h2', text: 'Step 1: Set Up Your Next.js Project' },
            { type: 'p', text: 'If you haven\'t already, create a new Next.js project by running the following command in your terminal:' },
            { type: 'code', text: 'npx create-next-app@latest my-app' },
            { type: 'p', text: 'Replace "my-app" with the name of your project. Navigate into your new project directory:' },
            { type: 'code', text: 'cd my-app' },
            { type: 'h2', text: 'Step 1.5: Create a .env File for Your OpenAI API Key' },
            { type: 'p', text: "Next.js has built-in support for loading environment variables from .env files into process.env." },
            { type: 'p', text: 'Create a new file in the root of your project named .env. This file will be used to store your OpenAI API key. The contents of the file should be:' },
            { type: 'code', text: '# .env\nOPENAI_API_KEY=your-openai-api-key' },
            { type: 'p', text: "Replace your-openai-api-key with your actual OpenAI API key." },
            { type: 'p', text: 'Important: Never commit your .env file into source control. It should be ignored by your .gitignore file by default. This file contains sensitive information that should not be shared or made public.' },
            { type: 'p', text: 'Now, when you run your Next.js application, the OPENAI_API_KEY environment variable will be loaded from the .env file, and you can access it in your code using process.env.OPENAI_API_KEY.' },
            { type: 'h2', text: 'Step 2: Install Required Dependencies' },
            { type: 'p', text: "The OpenAI package is the only one that isn't part of Next.js or Node.js module in this project. Install it using npm:" },
            { type: 'code', text: 'npm install openai' },
            { type: 'h2', text: 'Step 3: Create a New Page' },
            { type: 'p', text: "The frontend code of this application is responsible for handling user interactions and managing the state of the application. It provides a user interface where users can start and stop audio recording. When a user starts recording, the application captures audio from the user's microphone and stores it in chunks. Once the user stops recording, the application combines these chunks into a single audio Blob, converts it into a Base64 string, and sends it to the server-side function via a POST request. The server-side function transcribes the audio to text and returns the transcribed text in the response, which the frontend then displays on the page. The frontend code uses React hooks for state management and side effects, and it leverages the MediaRecorder API to capture audio from the user's microphone." },
            { type: 'p', text: "Here's how you can set up the app/page.jsx:" },
            { type: 'code', text: `"use client";

import styles from './page.module.css'
import { useState, useEffect } from "react";

export default function Home() {
  const [result, setResult] = useState();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  let chunks = [];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream);
          newMediaRecorder.onstart = () => {
            chunks = [];
          };
          newMediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
          };
          newMediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.onerror = function (err) {
              console.error('Error playing audio:', err);
            };
            audio.play();
            try {
              const reader = new FileReader();
              reader.readAsDataURL(audioBlob);
              reader.onloadend = async function () {
                const base64Audio = reader.result.split(',')[1];
                const response = await fetch("/api/speechToText", {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ audio: base64Audio }),
                });
                const data = await response.json();
                if (response.status !== 200) {
                  throw data.error || new Error(\`Request failed with status \${response.status}\`);
                }
                setResult(data.result);
              }
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          };
          setMediaRecorder(newMediaRecorder);
        })
        .catch(err => console.error('Error accessing microphone:', err));
    }
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2>Convert audio to text -&gt;</h2>
        <button onClick={recording ? stopRecording : startRecording}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <p>{result}</p>
      </div>
    </main>
  )
}` },
            { type: 'h2', text: 'Step 4: Create an API Route' },
            { type: 'p', text: "This server-side code handles POST requests to the /api/speechToText route. It receives audio data in the request body, converts the audio data to text using the OpenAI API, and returns the transcribed text in the response. The code uses the ffmpeg command to convert the audio data to MP3 format, which is required by the OpenAI API." },
            { type: 'p', text: 'Next.js allows us to easily create API routes. In your project, create a new file at app/api/route.js. This will be our server-side function for handling the speech-to-text conversion.' },
            { type: 'code', text: `import { Configuration, OpenAIApi } from "openai";
import { exec } from 'child_process';
import fs from 'fs';
import { NextResponse } from "next/server";

const util = require('util');
const execAsync = util.promisify(exec);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request) {
  if (!configuration.apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured, please follow instructions in README.md" }, { status: 500 });
  }
  const req = await request.json()
  const base64Audio = req.audio;
  const audio = Buffer.from(base64Audio, 'base64');
  try {
    const text = await convertAudioToText(audio);
    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error(\`Error with OpenAI API request: \${error.message}\`);
      return NextResponse.json({ error: "An error occurred during your request." }, { status: 500 });
    }
  }
}

async function convertAudioToText(audioData) {
  const mp3AudioData = await convertAudioToMp3(audioData);
  const outputPath = '/tmp/output.mp3';
  fs.writeFileSync(outputPath, mp3AudioData);
  const response = await openai.createTranscription(
    fs.createReadStream(outputPath),
    'whisper-1'
  );
  fs.unlinkSync(outputPath);
  return response.data.text;
}

async function convertAudioToMp3(audioData) {
  const inputPath = '/tmp/input.webm';
  fs.writeFileSync(inputPath, audioData);
  const outputPath = '/tmp/output.mp3';
  await execAsync(\`ffmpeg -i \${inputPath} \${outputPath}\`);
  const mp3AudioData = fs.readFileSync(outputPath);
  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);
  return mp3AudioData;
}` },
            { type: 'h2', text: 'Step 5: Test Your Application' },
            { type: 'p', text: 'Now, you should be able to run your application and test the speech-to-text functionality. Start your Next.js development server by running:' },
            { type: 'code', text: 'npm run dev' },
            { type: 'p', text: "Navigate to http://localhost:3000 in your web browser. You should see your application and be able to start and stop recording. The recorded audio will be sent to the Whisper API for conversion to text, and the result will be displayed on your page." },
            { type: 'p', text: 'Remember to handle errors and edge cases appropriately in your application. This guide provides a basic example, and there may be additional considerations for your specific use case.' },
            { type: 'p', text: "That's it! You've successfully integrated the Whisper API into a Next.js application." },
            { type: 'h2', text: 'Troubleshooting' },
            { type: 'p', text: 'If you encounter issues while following this tutorial, here are some tips that might help you debug your application:' },
            { type: 'ul', items: [
                'Add console.log statements at various points in your code to print out the values of variables, the flow of execution, or the results of function calls.',
                'API key not configured: make sure you have set your OpenAI API key in your .env file and that it\'s being correctly loaded into your application.',
                'Issues with audio recording: ensure that your browser has access to your microphone and that the MediaRecorder API is supported by your browser.',
                "Errors from the OpenAI API: check the error message for details — it might be due to issues with the audio data you're sending, rate limits, or other API usage issues.",
                'Issues with audio conversion: if you\'re having trouble converting the audio data to MP3 format, make sure you have ffmpeg installed and correctly set up on your server.',
            ] },
            { type: 'p', text: "If you're still having trouble, you can refer to the complete project code on GitHub." },
            { type: 'p', text: "Remember, debugging is a normal part of the development process. Don't get discouraged if things don't work right away. With patience and persistence, you'll be able to solve any issues you encounter. Happy coding!" },
        ],
        links: {
            source: 'https://github.com/Jordans2299/Whisper_NextJS_Tutorial/tree/main',
        },
    },
    {
        slug: 'revisiting-the-dao-hack',
        title: 'Revisiting the DAO Hack',
        date: '2022-12-31',
        category: 'Blockchain',
        excerpt: 'The recent FTX bankruptcy has prompted many to question the hype surrounding Web 3 and the cryptocurrency industry as a whole. To truly understand this wild world we call crypto, it\'s important to remember the mistakes of the past.',
        mediumUrl: 'https://medium.com/@jordans2299/revisiting-the-dao-hack-33224d641303',
        content: [
            { type: 'p', text: "The recent FTX bankruptcy has prompted many to question the hype surrounding Web 3 and the cryptocurrency industry as a whole. As someone passionate about both technology and finance, I can't help but root for blockchain to succeed and make its mark on the financial system. But let's be real, after over a decade and billions of dollars invested, we still haven't seen much disruption in finance. Nevertheless, I remain optimistic that as the technology matures and we weed out the bad actors, blockchain will finally have its breakthrough moment. And to truly understand this wild world we call crypto, it's important to remember the mistakes of the past and how they shape the present. The DAO hack, one of the most well-known mistakes from the past, raised doubts about the capabilities of cryptocurrency and how to effectively handle similar situations." },
            { type: 'p', text: 'When breaking down the hack it is important to understand what The DAO is. The DAO (Decentralized Autonomous Organization) was a smart contract on the Ethereum blockchain that was designed to operate as a decentralized venture capital fund. It was intended to allow investors to propose and vote on projects, and to allow investors to collectively make decisions about how to allocate funds and support promising projects.' },
            { type: 'p', text: 'The DAO was launched on April 30, 2016, and attracted over 10,000 investors and raised over $150 million during its 28-day crowdfunding period. This made it the largest crowdfunding campaign in history at the time.' },
            { type: 'p', text: 'However, on July 17, 2016, the DAO was hacked when an attacker exploited a vulnerability in its code, resulting in the theft of approximately 3.6 million Ether (worth around $50 million at the time). The hack occurred because the attacker was able to use the "split" function in the DAO\'s code to repeatedly withdraw the same Ether multiple times before the Ethereum network could process the transactions.' },
            { type: 'p', text: "The split function was intended to allow investors to specify the amount of Ether they wanted to withdraw from the DAO and then create a new \"child\" DAO with that amount of Ether in it. The child DAO would be controlled by the investor who created it, and they would be able to use the funds in it as they saw fit. However, the attacker was able to exploit a vulnerability in the split function to repeatedly call the function and withdraw the same Ether multiple times before the Ethereum network could process the transactions. This allowed the attacker to drain the DAO's funds into a child DAO under their control." },
            { type: 'p', text: 'The DAO hack was a significant event in the history of cryptocurrency and blockchain technology. It demonstrated the potential vulnerabilities of smart contracts on the blockchain, and it highlighted the need for robust security measures in their design and implementation. It also sparked a debate within the Ethereum community about the proper way to handle such incidents. Some argued that the stolen funds should be returned to their original owners, while others believed that the immutability of the blockchain should be upheld and the funds should be considered stolen.' },
            { type: 'p', text: 'In the end, a hard fork was implemented on the Ethereum network to return the stolen funds to their original owners. This involved creating a new version of the Ethereum blockchain that reversed the transactions that resulted in the theft of the funds, thereby returning them to their original owners. The hard fork was controversial, as it required all Ethereum users to upgrade to the new version of the blockchain to receive their stolen funds. Some users opposed the hard fork, arguing that it violated the principles of decentralization and immutability that are central to blockchain technology.' },
            { type: 'p', text: 'Despite the controversy, the hard fork was ultimately successful in returning the stolen funds to their original owners. However, the DAO hack served as a cautionary tale about the potential risks and vulnerabilities of smart contracts on the blockchain, and it has led to increased scrutiny and efforts to improve the security of smart contracts and other decentralized applications.' },
        ],
    },
];

export function getArticleBySlug(slug) {
    return articles.find((article) => article.slug === slug) || null;
}
