<script lang='ts'>
  import type { MusicData, PreviousMusicData } from "./song-types";
  import { textfit } from 'svelte-textfit';
  import { fade } from "svelte/transition";

  let parent;

  export let songInfo: MusicData
  export let previousSong: PreviousMusicData | null

</script>

<div class="info">
    {#key previousSong}
    <div class="title"  bind:this={parent}>
        <div use:textfit={{parent, mode:'multi', min:90, max: 100, autoResize: true}} in:fade={{duration: 1000}}>{songInfo.title}</div>
    </div>
    <div class="artist"  bind:this={parent}>
        <div use:textfit={{parent,mode:'multi', min:50, max: 60, autoResize: true}} in:fade={{duration: 1000}}>by {songInfo?.artists}</div>
    </div>
    {/key}
</div>

<style>
    .info {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .title {
        width: 100%;
        height: auto;
        font-weight: bold;
        color: white;
        font-style: italic;
    }
    .artist {
        width: 100%;
        height: auto;
        font-weight: lighter;
        color: white;
    }
</style>