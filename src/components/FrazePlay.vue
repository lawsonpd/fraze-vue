<template>
  <div class="fraze">
    <h1 class="main-header">Fraze!</h1>
    <template v-if="scores">
      <div class="scores">
        <p>Team 1 score: {{ this.$store.state.teamOneScore }}</p>
        <p>Team 2 score: {{ this.$store.state.teamTwoScore }}</p>
      </div>
    </template>
    <template v-if="gameOn">
      <h3>The word to guess is</h3>
      <h1 class="word">{{ word }}</h1>
      <h3>Team {{ currentTeam }} guessing now</h3>
      <button @click.prevent="nextWord">Next</button>
      <button @click.prevent="skipWord">Skip</button>
      <div id="timeSection">
        <transition name="fade">
          <div id="timer" v-show="timeToggle">
            <h2 style="margin-bottom: 5px;">{{ timeRemaining }}</h2>
            <p style="margin-top: 5px;">seconds remaining</p>
          </div>
        </transition>
      </div>
    </template>
    <template v-else-if="!gameOn">
      <h2>Get ready!</h2>
      <button @click.prevent="startGame">Start game</button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FrazePlay',
  data () {
    return {
      gameOn: false,
      word: '',
      timerId: '',
      timeRemaining: 60,
      timeToggle: false
    }
  },
  computed: {
    scores () {
      return this.$store.state.teamOneScore || this.$store.state.teamTwoScore
    },
    currentTeam () {
      return this.$store.state.teamGuessing + 1
    }
  },
  methods: {
    startGame: function () {
      this.gameOn = true
      this.getWord()
      this.timeRemaining = 60
      setTimeout(this.endGame, 60000)
      this.timerId = setInterval(this.showTime, 10000)
    },
    endGame: function () {
      if (this.currentTeam === 1) {
        this.$store.commit('incrementTeamTwoScore')
      } else {
        this.$store.commit('incrementTeamOneScore')
      }
      this.gameOn = false
      clearInterval(this.timerId)
    },
    getWord: function () {
      this.$http.get('http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&includePartOfSpeech=idiom&minCorpusCount=1000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=88151505619400fe187d61357090727518edebec080dfdb55')
      .then(response => {
        this.word = response.data.word
      })
    },
    nextWord: function () {
      this.getWord()

      // switch team
      const team = this.$store.state.teamGuessing
      this.$store.state.teamGuessing = Math.abs(team - 1)
    },
    skipWord: function () {
      // this should also advance the timer
      this.getWord()
    },
    showTime: function () {
      this.timeToggle = true
      this.timeRemaining -= 10
      setTimeout(this.toggleTime, 2000)
    },
    toggleTime: function () {
      this.timeToggle = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
  font-family: 'Arima Madurai', cursive;
}

.main-header {
  font-size: 5em;
  font-family: 'Lemonada', cursive;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.word {
  color: purple;
}

.scores {
  /*background-color: #EEE;
  width: 200px;
  margin: 0 auto;
  border-radius: 5%;*/
}

#timeSection {
  /*text-align: center;
  height: 1.25em;*/
}

#timer {
  /*height: .3em;*/
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .75s
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
