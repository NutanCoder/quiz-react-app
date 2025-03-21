import { memberService } from '@/features/quiz/services/member.service';
import { IMember } from '@/features/quiz/types/member.types';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddMember from './quiz.add.member';
import MemberCard from '@/components/members/member_card';
import { Card, CardHeader, Modal } from '@/components/common';

function QuizMembersPage() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMember = useCallback(async () => {
    if (!id) return;
    const { data, error } = await memberService.getMembers(id);
    setLoading(false);
    if (data) {
      setMembers(data);
    } else {
      setError(error);
      toast.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  const onMemberAdded = () => {
    setOpen(false);
    toast.success('Access Granted!');
    fetchMember();
  };

  const onDeleteClick = async (quizId: string, studentId: string) => {
    const { data, error } = await memberService.removeMember(quizId, studentId);
    console.log({ error, data });
    if (error) {
      toast.error(error);
    } else {
      fetchMember();
    }
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    <h1>Error</h1>;
  }

  return (
    <div className="container mx-auto my-4">
      <Card>
        <CardHeader
          title="Members"
          onClick={() => setOpen(true)}
          buttonTitle="Add Member"
        />
        <ul className="space-y-4">
          {members.map((member) => (
            <MemberCard
              member={member}
              key={member.uuid}
              onDelete={onDeleteClick}
            />
          ))}
          {members.length == 0 && (
            <>
              <h1>No members</h1>
            </>
          )}
        </ul>
      </Card>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Member">
        <AddMember onMemberAdded={onMemberAdded} />
      </Modal>
    </div>
  );
}

export default QuizMembersPage;
