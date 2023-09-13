<script lang='ts'>
  import type { MusicData } from "./song-types";
  import { textfit } from 'svelte-textfit';
  let parent;

    export let songInfo: MusicData
</script>

<div class="info">
    <div class="title"  bind:this={parent}>
        <div use:textfit={{parent, mode:'multi', min:90, max: 100, autoResize: true}}>{songInfo?.title}</div>
    </div>
    <div class="artist"  bind:this={parent}>
        <div use:textfit={{parent,mode:'multi', min:50, max: 60, autoResize: true}}> by {songInfo?.artists}</div>
    </div>
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