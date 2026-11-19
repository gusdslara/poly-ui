<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    const modes = [
        { id: "chat", label: "Chat", icon: "💬", path: "/" },
        { id: "image", label: "Images", icon: "🖼️", path: "/image" },
        { id: "video", label: "Video", icon: "🎬", path: "/video" },
        { id: "model3d", label: "3D Models", icon: "🧊", path: "/model3d" },
        { id: "code", label: "Coding", icon: "💻", path: "/code" },
    ];

    let showSettings = $state(false);
    let isExpanded = $state(false);

    function isActive(path: string): boolean {
        return $page.url.pathname === path;
    }

    function toggleExpand() {
        isExpanded = !isExpanded;
    }
</script>

<aside
    class="bg-white border-r border-gray-200 flex flex-col h-full smooth-transition {isExpanded
        ? 'w-64'
        : 'w-20'}"
    onmouseenter={() => (isExpanded = true)}
    onmouseleave={() => (isExpanded = false)}
>
    <!-- Header -->
    <div
        class="p-4 border-b border-gray-200 cursor-pointer"
        onclick={toggleExpand}
    >
        <div class="flex items-center gap-3">
            <span class="text-2xl">🎯</span>
            {#if isExpanded}
                <div class="overflow-hidden">
                    <h1
                        class="text-xl font-semibold text-primary-600 whitespace-nowrap"
                    >
                        Argus AI
                    </h1>
                    <p class="text-xs text-gray-500 whitespace-nowrap">
                        Universal LLM
                    </p>
                </div>
            {/if}
        </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-3 space-y-1">
        {#each modes as mode}
            <button
                onclick={() => goto(mode.path)}
                class="w-full flex items-center gap-3 px-3 py-3 rounded-lg smooth-transition group relative
					{isActive(mode.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'}"
                title={mode.label}
            >
                <span class="text-2xl {isExpanded ? '' : 'mx-auto'}"
                    >{mode.icon}</span
                >
                {#if isExpanded}
                    <span
                        class="whitespace-nowrap overflow-hidden text-sm font-medium"
                        >{mode.label}</span
                    >
                {/if}
            </button>
        {/each}
    </nav>

    <!-- Settings Button -->
    <div class="p-3 border-t border-gray-200">
        <button
            onclick={() => (showSettings = !showSettings)}
            class="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 smooth-transition"
            title="Settings"
        >
            <span class="text-2xl {isExpanded ? '' : 'mx-auto'}">⚙️</span>
            {#if isExpanded}
                <span
                    class="whitespace-nowrap overflow-hidden text-sm font-medium"
                    >Settings</span
                >
            {/if}
        </button>
    </div>
</aside>

{#if showSettings}
    <div
        class="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center"
        onclick={() => (showSettings = false)}
    >
        <div
            class="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
            onclick={(e) => e.stopPropagation()}
        >
            <h2 class="text-2xl font-semibold mb-6">Settings</h2>

            <div class="space-y-6">
                <div>
                    <h3 class="text-lg font-medium mb-3">API Configuration</h3>
                    <div class="space-y-3">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Local LLM URL
                            </label>
                            <input
                                type="text"
                                placeholder="http://localhost:11434"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                OpenAI API Key
                            </label>
                            <input
                                type="password"
                                placeholder="sk-..."
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Anthropic API Key
                            </label>
                            <input
                                type="password"
                                placeholder="sk-ant-..."
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-8">
                <button
                    onclick={() => (showSettings = false)}
                    class="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg smooth-transition"
                >
                    Cancel
                </button>
                <button
                    onclick={() => (showSettings = false)}
                    class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 smooth-transition"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
{/if}
