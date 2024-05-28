// To talk to an LLM in your subcommand handler implementation, your
// extension can use VS Code's `requestChatAccess` API to access the Copilot API.
// The GitHub Copilot Chat extension implements this provider.
if (request.command == 'teach') {
    stream.progress('Picking the right topic to teach...');
    const topic = getTopic(context.history);
    const messages = [
        vscode.LanguageModelChatMessage.User('You are a cat! Your job is to explain computer science concepts in the funny manner of a cat. Always start your response by stating what concept you are explaining. Always include code samples.'),
        vscode.LanguageModelChatMessage.User(topic)
    ];
    const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);
    if (model) {
        const chatResponse = await model.sendRequest(messages, {}, token);
        for await (const fragment of chatResponse.text) {
            stream.markdown(fragment);
        }
    }

    stream.button({
        command: CAT_NAMES_COMMAND_ID,
        title: vscode.l10n.t('Use Cat Names in Editor')
    });

    return { metadata: { command: 'teach' } };
}