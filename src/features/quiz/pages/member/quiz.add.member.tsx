import { Button, InputField } from '@/components/common';
import { memberService } from '@/features/quiz/services/member.service';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface AddMemberProps {
  onMemberAdded: () => void;
}

function AddMember({ onMemberAdded }: AddMemberProps) {
  const { id } = useParams();
  const [email, setEmail] = useState('');

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const { error } = await memberService.addMember(id, email);
    if (error) {
      toast.error(error);
    } else {
      onMemberAdded();
    }
  };

  const handleInput = (_: string, value: string | boolean) => {
    if (typeof value != 'string') return;
    setEmail(value);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="flex flex-col gap-2">
        <InputField
          name="email"
          value={email}
          placeholder="Enter Member's Email"
          onChange={handleInput}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default AddMember;
