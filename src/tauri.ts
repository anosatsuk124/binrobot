import { open } from '@tauri-apps/api/dialog';
import { emit } from '@tauri-apps/api/event';

// Open a selection dialog for directories
const execCommandPath = async () =>
    await open({
        multiple: false
    });

if (execCommandPath != null) {
    emit('execCommandPath', execCommandPath);
}
