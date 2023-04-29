export const getChat = async (req, res) => {
    try {
        res.render('../src/views/main.hbs')
    } catch (error) {
        console.log("getChat controller error: " + error);
    }
}
