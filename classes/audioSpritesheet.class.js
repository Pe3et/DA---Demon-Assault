class AudioSpritesheet {
    startTimeArray
    audioSheet
    soundDurationMS

    constructor(src, soundDurationMS, startTimeArray) {
        this.audioSheet = new Audio(src);
        this.audioSheet.volume = 0.2;
        this.soundDurationMS = soundDurationMS;
        this.startTimeArray = startTimeArray;
    }

    playRandomSound() {
        if (this.startTimeArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.startTimeArray.length);
            this.audioSheet.currentTime = this.startTimeArray[randomIndex];
            this.audioSheet.play();
            setTimeout(() => this.audioSheet.pause(), this.soundDurationMS)
        }
    }
}