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

<main class="flex m-2 p-5 rounded-2xl bg-slate-700 bg-opacity-70">
    {#if songInfo}
        {#key songInfo}
        <img class="w-72 h-72 rounded-2xl mr-8" src={songInfo.cover_path} alt="cover" in:fade={{duration: 1500}}/> 
        <Labels {songInfo} {previousSong}></Labels>
        {/key}
        {:else}
        <p class="m-auto text-6xl w-72 h-72 text-center align-middle">Loading...</p>
    {/if}
    </main>