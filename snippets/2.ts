const chatResponse = await model.sendRequest(messages, {}, token);
for await (const fragment of chatResponse.text) {
    stream.markdown(catFragment);
}