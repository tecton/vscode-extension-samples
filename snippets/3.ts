cat.followupProvider = {
    provideFollowups(result: ICatChatResult, context: vscode.ChatContext, token: vscode.CancellationToken) {
        return [{
            prompt: '',
            label: vscode.l10n.t('Teach me more!'),
            command: 'teach'
        } satisfies vscode.ChatFollowup];
    }
};