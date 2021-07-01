export default {
  methods: {
    generateUUID () {
      let d = new Date().getTime()
      let d2 = (performance && performance.now && performance.now() * 1000) || 0
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function (c) {
          let rand = Math.random() * 16
          if (d > 0) {
            rand = (d + rand) % 16 | 0
            d = Math.floor(d / 16)
          } else {
            rand = (d2 + rand) % 16 | 0
            d2 = Math.floor(d2 / 16)
          }
          return (c === 'x' ? rand : (rand & 0x7) | 0x8).toString(16)
        })
      return uuid
    }
  }
}
