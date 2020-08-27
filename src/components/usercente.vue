<template>
  <div>
    {{this.usersession}}
  </div>
</template>

<script>
export default {
  name: 'usercenter',
  data: function () {
    return {usersession: sessionStorage.getItem('usersession')}
  }
}
</script>

<style scoped>

</style>
