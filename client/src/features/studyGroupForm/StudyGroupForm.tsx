import { useState } from 'react';
import './StudyGroupForm.scss';
import 'assets/style/_flex.scss';
import 'assets/style/_typography.scss';
import { createStudyGroup, Category, Region } from 'api/createGroupFormApi';

const StudyGroupForm = () => {
	const [groupName, setGroupName] = useState('');
	const [meetingType, setMeetingType] = useState<'대면' | '비대면' | ''>('');
	const [meetingTime, setMeetingTime] = useState('');
	const [meetingCycle, setMeetingCycle] = useState<'월' | '주'>('월');
	const [meetingDay, setMeetingDay] = useState('');
	const [memberCount, setMemberCount] = useState('');
	const [notice, setNotice] = useState('');
	const [region, setRegion] = useState<Region>(Region.해당없음);
	const [category, setCategory] = useState<Category>(Category.기타);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const groupData = {
			name: groupName,
			maxMembers: Number(memberCount),
			notice,
			meetingDays: `${meetingCycle} ${meetingDay}일`,
			meetingTime,
			region,
			category,
			type: meetingType,
		};

		try {
			const response = await createStudyGroup(groupData);
			alert(response.message);
		} catch (error) {
			console.error('스터디 그룹 생성 실패:', error);
			alert('스터디 그룹 생성에 실패했습니다.');
		}
	};

	return (
		<div className="study-group-form">
			<div className="title heading2 flex-center">스터디 그룹 생성</div>

			<div className="group-name">
				<input
					type="text"
					placeholder="스터디 그룹명 입력"
					value={groupName}
					onChange={(e) => setGroupName(e.target.value)}
					className="group-name-input button2"
				/>
			</div>

			<div>
				<select
					value={meetingCycle}
					onChange={(e) => setMeetingCycle(e.target.value as '월' | '주')}
					className="meeting-period button2"
				>
					<option value="월">월</option>
					<option value="주">주</option>
				</select>
				<input
					type="number"
					placeholder="숫자 입력"
					value={meetingDay}
					onChange={(e) => setMeetingDay(e.target.value)}
					className="meeting-period-input button2"
				/>
				<span className="button2">일</span>
			</div>

			<div className="meeting-method">
				<button
					onClick={() => setMeetingType('대면')}
					className={`meeting-method-button button2 ${meetingType === '대면' ? 'bg-green-300' : ''}`}
				>
					대면
				</button>
				<button
					onClick={() => setMeetingType('비대면')}
					className={`meeting-method-button button2 ${meetingType === '비대면' ? 'bg-green-300' : ''}`}
				>
					비대면
				</button>
			</div>

			<div className="time-option">
				{['오전', '오후', '저녁', '새벽'].map((time) => (
					<button
						key={time}
						onClick={() => setMeetingTime(time)}
						className={`time-option-button button2 ${meetingTime === time ? 'bg-green-300' : ''}`}
					>
						{time}
					</button>
				))}
			</div>

			<div>
				<select
					value={region}
					onChange={(e) => setRegion(e.target.value as Region)}
					className="region-select button2"
				>
					{Object.values(Region).map((r) => (
						<option key={r} value={r}>
							{r}
						</option>
					))}
				</select>
			</div>

			<div>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value as Category)}
					className="category-select button2"
				>
					{Object.values(Category).map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>

			<div>
				<input
					type="text"
					placeholder="공지사항 입력"
					value={notice}
					onChange={(e) => setNotice(e.target.value)}
					className="notice button2"
				/>
			</div>

			<button className="create-button" onClick={handleSubmit}>
				생성하기
			</button>
		</div>
	);
};

export default StudyGroupForm;
