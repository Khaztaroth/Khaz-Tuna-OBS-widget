<script lang='ts'>
  import type { MusicData, PreviousMusicData } from "./song-types";
  import { textfit } from 'svelte-textfit';
  import { fade } from "svelte/transition";

  let parent;

  export let songInfo: MusicData
  export let previousSong: PreviousMusicData | null

</script>

<div class="h-full w-5/6 flex flex-col">
    {#key previousSong}
    <div class="w-full h-auto font-bold text-white italic"  bind:this={parent}>
        <div use:textfit={{parent, mode:'single', min:90, max: 100, autoResize: true, width: 1000, height: 100}} in:fade={{duration: 1000}}>{songInfo.title}</div>
    </div>
    <div class="w-full h-auto font-light text-white"  bind:this={parent}>
        <div use:textfit={{parent,mode:'multi', min:50, max: 60, autoResize: true,  width: 1000, height: 100}} in:fade={{duration: 1000}}>by {songInfo?.artists}</div>
    </div>
    {/key}
</div>