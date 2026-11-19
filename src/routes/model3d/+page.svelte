<script lang="ts">
    import { onMount } from "svelte";

    let prompt = $state("");
    let generatedModels = $state<any[]>([]);
    let isGenerating = $state(false);
    let canvasRef: HTMLCanvasElement;

    async function generateModel() {
        if (!prompt.trim() || isGenerating) return;

        isGenerating = true;

        // Simulate 3D model generation
        setTimeout(() => {
            generatedModels = [
                { id: Date.now(), prompt: prompt },
                ...generatedModels,
            ];
            isGenerating = false;
            prompt = "";
        }, 3000);
    }

    onMount(() => {
        // Three.js initialization would go here
    });
</script>

<div class="flex flex-col h-full">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200 bg-white">
        <h2 class="text-xl font-semibold text-gray-900">3D Model Generation</h2>
        <p class="text-sm text-gray-500 mt-1">
            Create 3D models from text descriptions
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
                    Describe the 3D model you want to create
                </label>
                <textarea
                    bind:value={prompt}
                    placeholder="A low-poly tree with autumn colors..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent smooth-transition"
                    rows="3"
                ></textarea>
                <button
                    onclick={generateModel}
                    disabled={!prompt.trim() || isGenerating}
                    class="mt-4 w-full px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition font-medium"
                >
                    {isGenerating ? "Generating..." : "Generate 3D Model"}
                </button>
            </div>
        </div>

        <!-- Model Gallery -->
        {#if generatedModels.length > 0}
            <div class="max-w-6xl mx-auto">
                <h3 class="text-lg font-semibold mb-4">Generated Models</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each generatedModels as model}
                        <div
                            class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200"
                        >
                            <div
                                class="w-full aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center"
                            >
                                <canvas
                                    bind:this={canvasRef}
                                    class="w-full h-full"
                                ></canvas>
                                <div class="text-6xl">🧊</div>
                            </div>
                            <div class="p-4">
                                <p class="text-sm text-gray-600 mb-3">
                                    {model.prompt}
                                </p>
                                <div class="flex gap-2">
                                    <button
                                        class="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg smooth-transition"
                                    >
                                        Download GLB
                                    </button>
                                    <button
                                        class="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg smooth-transition"
                                    >
                                        Download OBJ
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <div class="flex items-center justify-center h-64">
                <div class="text-center">
                    <div class="text-6xl mb-4">🧊</div>
                    <h3 class="text-xl font-medium text-gray-900 mb-2">
                        No models yet
                    </h3>
                    <p class="text-gray-500">
                        Generate your first 3D model above
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>
