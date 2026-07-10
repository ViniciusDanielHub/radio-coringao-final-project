import { GenericPage } from './GenericPage';

export function TransferClubsPage() {
  return (
    <GenericPage
      title="Clubes de Transferência"
      apiBase="clube"
      apiPath="/admin/transfer-clubs"
      columns={[
        { key: 'name', label: 'Nome' },
      ]}
      formFields={[
        { key: 'name', label: 'Nome', required: true },
      ]}
    />
  );
}
