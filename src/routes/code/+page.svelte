<script lang="ts">
    interface Message {
        role: "user" | "assistant";
        content: string;
    }

    let messages = $state<Message[]>([]);
    let input = $state("");
    let isLoading = $state(false);
    let language = $state("javascript");

    const languages = [
        "javascript",
        "typescript",
        "python",
        "java",
        "rust",
        "go",
        "cpp",
    ];

    async function sendMessage() {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        input = "";

        messages.push({ role: "user", content: userMessage });
        isLoading = true;

        // Simulate API call
        setTimeout(() => {
            messages.push({
                role: "assistant",
                content: `\`\`\`${language}\n// Example code response\nfunction example() {\n  console.log("This is a placeholder response");\n  return true;\n}\n\`\`\``,
            });
            isLoading = false;
        }, 1000);
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
</script>

<div class="flex flex-col h-full">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200 bg-white">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    Coding Assistant
                </h2>
                <p class="text-sm text-gray-500 mt-1">
                    AI-powered code generation and assistance
                </p>
            </div>
            <select
                bind:value={language}
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent smooth-transition"
            >
                {#each languages as lang}
                    <option value={lang}
                        >{lang.charAt(0).toUpperCase() + lang.slice(1)}</option
                    >
                {/each}
            </select>
        </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-6 space-y-4">
        {#if messages.length === 0}
            <div class="flex items-center justify-center h-full">
                <div class="text-center">
                    <div class="text-6xl mb-4">💻</div>
                    <h3 class="text-xl font-medium text-gray-900 mb-2">
                        Start coding
                    </h3>
                    <p class="text-gray-500">
                        Ask for code examples, debugging help, or explanations
                    </p>
                </div>
            </div>
        {:else}
            {#each messages as message}
                <div
                    class="flex {message.role === 'user'
                        ? 'justify-end'
                        : 'justify-start'}"
                >
                    <div
                        class="max-w-[80%] {message.role === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white border border-gray-200'} 
						rounded-2xl px-4 py-3 shadow-sm"
                    >
                        {#if message.content.includes("```")}
                            <pre
                                class="text-sm whitespace-pre-wrap overflow-x-auto bg-neutral-900 text-white p-4 rounded-lg"><code
                                    >{message.content
                                        .replace(/```\w*\n?/g, "")
                                        .replace(/```/g, "")}</code
                                ></pre>
                        {:else}
                            <p class="text-sm whitespace-pre-wrap">
                                {message.content}
                            </p>
                        {/if}
                    </div>
                </div>
            {/each}
            {#if isLoading}
                <div class="flex justify-start">
                    <div
                        class="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm"
                    >
                        <div class="flex gap-1">
                            <div
                                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style="animation-delay: 0ms"
                            ></div>
                            <div
                                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style="animation-delay: 150ms"
                            ></div>
                            <div
                                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style="animation-delay: 300ms"
                            ></div>
                        </div>
                    </div>
                </div>
            {/if}
        {/if}
    </div>

    <!-- Input -->
    <div class="p-6 border-t border-gray-200 bg-white">
        <div class="flex gap-3">
            <textarea
                bind:value={input}
                onkeydown={handleKeydown}
                placeholder="Ask for code help... (Enter to send, Shift+Enter for new line)"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent smooth-transition"
                rows="1"
            ></textarea>
            <button
                onclick={sendMessage}
                disabled={!input.trim() || isLoading}
                class="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition font-medium"
            >
                Send
            </button>
        </div>
    </div>
</div>
