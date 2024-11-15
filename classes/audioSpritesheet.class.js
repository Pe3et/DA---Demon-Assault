class AudioSpritesheet {
    startTimeArray
    audioSheet
    soundDurationMS
    volume = 0.2

    constructor(src, soundDurationMS, startTimeArray) {
        this.audioSheet = new Audio(src);
        this.audioSheet.volume = this.volume;
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