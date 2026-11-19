<script lang="ts">
    let prompt = $state("");
    let generatedImages = $state<string[]>([]);
    let isGenerating = $state(false);

    async function generateImage() {
        if (!prompt.trim() || isGenerating) return;

        isGenerating = true;

        // Simulate image generation
        setTimeout(() => {
            generatedImages = [
                "https://via.placeholder.com/512x512/2b4f81/ffffff?text=Generated+Image",
                ...generatedImages,
            ];
            isGenerating = false;
            prompt = "";
        }, 2000);
    }
</script>

<div class="flex flex-col h-full">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200 bg-white">
        <h2 class="text-xl font-semibold text-gray-900">Image Generation</h2>
        <p class="text-sm text-gray-500 mt-1">
            Create images from text descriptions
        </p>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-6">
        <!-- Input Section -->
        <div class="max-w-3xl mx-auto mb-8">
            <div
                class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Describe the image you want to create
                </label>
                <textarea
                    bind:value={prompt}
                    placeholder="A serene landscape with mountains and a lake at sunset..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent smooth-transition"
                    rows="3"
                ></textarea>
                <button
                    onclick={generateImage}
                    disabled={!prompt.trim() || isGenerating}
                    class="mt-4 w-full px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition font-medium"
                >
                    {isGenerating ? "Generating..." : "Generate Image"}
                </button>
            </div>
        </div>

        <!-- Gallery -->
        {#if generatedImages.length > 0}
            <div class="max-w-6xl mx-auto">
                <h3 class="text-lg font-semibold mb-4">Generated Images</h3>
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {#each generatedImages as image}
                        <div
                            class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md smooth-transition"
                        >
                            <img
                                src={image}
                                alt="Generated"
                                class="w-full aspect-square object-cover"
                            />
                            <div class="p-3 flex gap-2">
                                <button
                                    class="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg smooth-transition"
                                >
                                    Download
                                </button>
                                <button
                                    class="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg smooth-transition"
                                >
                                    Share
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <div class="flex items-center justify-center h-64">
                <div class="text-center">
                    <div class="text-6xl mb-4">🖼️</div>
                    <h3 class="text-xl font-medium text-gray-900 mb-2">
                        No images yet
                    </h3>
                    <p class="text-gray-500">Generate your first image above</p>
                </div>
            </div>
        {/if}
    </div>
</div>
