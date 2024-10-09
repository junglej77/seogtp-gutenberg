import { Button } from '@wordpress/components';

const SaveButton = ({ isSaving, onSave }) => (
    <Button isPrimary disabled={isSaving} onClick={onSave}>
        {isSaving ? 'Savingaaaa...' : 'Saveaaaa'}
    </Button>
);

export default SaveButton;
