export default {
  incrementTeamOneScore (state) {
    state.teamOneScore++
  },
  incrementTeamTwoScore (state) {
    state.teamTwoScore++
  },
  switchTeam (state) {
    const team = state.teamGuessing
    state.teamGuessing = Math.abs(team - 1)
  }
}
