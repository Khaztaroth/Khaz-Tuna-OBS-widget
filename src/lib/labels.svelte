<script lang='ts'>
  import type { MusicData, PreviousMusicData } from "./song-types";
  import { fade } from "svelte/transition";
  
  import { textfit } from 'svelte-textfit';
  let parent;

  export let songInfo: MusicData
  export let previousSong: PreviousMusicData | null
</script>

<div class="w-full h-full flex flex-col drop-shadow-lg">
    {#key previousSong}
    <div class="w-full h-5/6 font-extrabold flex-grow flex-1 drop-shadow-lg text-zinc-100" id="title" bind:this={parent}>
        <div use:textfit={{parent, mode:'single', min:90, max: 100, autoResize: true}} in:fade={{duration: 1000}}>{songInfo.title}</div>
    </div>
    <div class="w-full h-5/6 font-ligh text-zinc-100"  id="artist" bind:this={parent}>
        <div use:textfit={{parent,mode:'multi', min:50, max: 60, autoResize: true}} in:fade={{duration: 1000}}>by {songInfo?.artists}</div>
    </div>
    {/key}
</div>