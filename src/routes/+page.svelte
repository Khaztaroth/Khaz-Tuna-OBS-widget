<!-- svelte-textfit https://github.com/micha-lmxt/svelte-textfit?ref=madewithsvelte.com -->
<!-- transition documentation https://svelte.dev/docs/svelte-transition -->

<script lang="ts">
    import type { MusicData, PreviousMusicData } from "$lib/song-types.ts";
    import { onDestroy, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Labels from '$lib/labels.svelte';

    const tunaServer = 'http://localhost:1608/'
    let songInfo: MusicData | null = null;
    let previousSong: PreviousMusicData | null = {info: {artist: [], title: "", cover_path: ""}};

    async function fetchData() {
        try {
        const musicResponse = await fetch(tunaServer);
        const musicData: MusicData = await musicResponse.json();
        if (musicData.artists === previousSong?.info.artist || musicData.title === previousSong?.info.title) {
            return
        } else {
            songInfo = musicData;
            previousSong = {info: {artist: songInfo?.artists, title: songInfo?.title, cover_path: songInfo?.cover_path}}
        }
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
        {#key songInfo}
        <img class="cover" src={songInfo.cover_path} alt="cover" in:fade={{duration: 1500}}/> 
        <Labels {songInfo} {previousSong}></Labels>
        {/key}
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
