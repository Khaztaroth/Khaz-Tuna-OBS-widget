<!-- svelte-textfit https://github.com/micha-lmxt/svelte-textfit?ref=madewithsvelte.com -->

<script lang="ts">
    import type { MusicData } from "$lib/song-types.ts";
    import { onDestroy, onMount } from "svelte";
    import Labels from '$lib/labels.svelte'

    const tunaServer = 'http://localhost:1608/'
    let songInfo: MusicData | null = null;

    async function fetchData() {
        try {
        const musicResponse = await fetch(tunaServer);
        const musicData = await musicResponse.json();
        songInfo = musicData;
        // console.log(musicData);
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMount(fetchData);

const updateInterval = 5000
const intervalId = setInterval(fetchData, updateInterval)

onDestroy(() => {
    clearInterval(intervalId)
})
    
</script>

<main class="labels">
    {#if songInfo}
    <img class="cover" src={songInfo.cover_path} alt="cover"/> 
    <Labels {songInfo}></Labels>
    {:else}
        <p>Loading...</p>
    {/if}
</main>

<style>
    .labels {
        font-family: Arial, Helvetica, sans-serif;
        display: flex;
        margin: auto 0 auto;
        padding: 1rem;
        border-radius: 2rem;
        background-color: rgba(20, 20, 20, 0.80);
    }
    .cover {
        width: 25em;
        height: 25em;
        border-radius: 1em;
        margin-right: 2rem;
    }
    p {
        font-size: 8rem;
        margin: auto auto auto;
        width: 100%;
        height: 100%;
    }
</style>
