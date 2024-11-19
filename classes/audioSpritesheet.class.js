class AudioSpritesheet {
    startTimeArray
    audioSheet
    soundDurationMS
    volume = 0.2

    /** Initializes the AudioSpritesheet with the given audio source, sound duration, and start time array. */
    constructor(src, soundDurationMS, startTimeArray) {
        this.audioSheet = new Audio(src);
        this.audioSheet.volume = this.volume;
        this.soundDurationMS = soundDurationMS;
        this.startTimeArray = startTimeArray;
    }

    /** Plays a random sound from the audio spritesheet. */
    playRandomSound() {
        if (this.startTimeArray.length > 0 && this.audioSheet.paused) {
            const randomIndex = Math.floor(Math.random() * this.startTimeArray.length);
            this.audioSheet.currentTime = this.startTimeArray[randomIndex];
            this.audioSheet.play();
            setTimeout(() => this.audioSheet.pause(), this.soundDurationMS)
        }
    }
}