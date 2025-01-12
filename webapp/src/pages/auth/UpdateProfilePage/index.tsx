import { EditAvatar } from './EditAvatar';
import { EditPassword } from './EditPassword';
import { EditUserName } from './EditUserName';
import { ErrorPageComponent } from '@/components/ErrorComponent';
import { Segment } from '@/components/Segment';
import { useUserContext } from '@/lib/context';

export function UpdateProfilePage() {
  const user = useUserContext();
  if (!user) {
    return <ErrorPageComponent message="User not found" />;
  }

  return (
    <Segment title="Update User">
      <EditUserName user={user} />
      <EditPassword />
      <EditAvatar user={user} />
    </Segment>
  );
}
