import { IMember } from '@/features/quiz/types/member.types';
import { Button } from '../common';

interface MemberProps {
  member: IMember;
  onDelete: (quizId: string, studentId: string) => void;
}

function MemberCard({ member, onDelete }: MemberProps) {
  return (
    <li
      key={member.uuid}
      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
    >
      <div className="flex items-center space-x-4">
        {/* Avatar fallback if avatar_url is null */}
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {member.student.first_name[0]}
        </div>
        <div>
          <div className="font-semibold text-lg">
            {member.student.first_name} {member.student.last_name}
          </div>
          <div className="text-sm text-gray-600">{member.student.email}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-right">
          <div className="text-sm text-gray-500">{member.student.role}</div>
          <div className="text-blue-600 font-semibold">
            {member.student.xp} XP
          </div>
        </div>
        <Button
          variant="danger"
          onClick={() => {
            onDelete(member.quiz_id, member.student_id);
          }}
        >
          Remove Member
        </Button>
      </div>
    </li>
  );
}

export default MemberCard;
